from fastapi import FastAPI
import pyodbc
import pandas as pd
import numpy as np
import joblib
import warnings
from fastapi.middleware.cors import CORSMiddleware
warnings.filterwarnings("ignore")

app = FastAPI(debug=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # your Angular app origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Setup connection string for pyodbc
def connect_to_db():
    conn_str = (
        "DRIVER={ODBC Driver 17 for SQL Server};"
        "SERVER=100.100.100.1;"
        "DATABASE=Valsad_Disaster_Mgt;"
        "UID=rsuser;"
        "PWD=P8L5fE123456_"
    )
    return pyodbc.connect(conn_str)

def fetch_water_level():
    conn = connect_to_db()
    query = """
    SELECT [WaterLevel], [ReadingLocationID], [EDateTime]
    FROM [dbo].[tbl_DailyReadingRecord]
    WHERE YEAR([EDateTime]) = YEAR(GETDATE()) AND ReadingLocationID = 1
    ORDER BY [EDateTime] DESC
    """
    df = pd.read_sql(query, conn)
    conn.close()
    df["EDateTime"] = pd.to_datetime(df["EDateTime"]).dt.floor('10T')
    df = df.groupby("EDateTime").first().reset_index()
    return df

def fetch_water_discharge():
    conn = connect_to_db()
    query = """
    SELECT [TotalDischarge], [EDateTime]
    FROM [dbo].[tbl_ReservoirDischargeEntry] 
    WHERE YEAR([EDateTime]) = YEAR(GETDATE())
    ORDER BY [EDateTime] DESC
    """
    df = pd.read_sql(query, conn)
    conn.close()
    df["EDateTime"] = pd.to_datetime(df["EDateTime"]).dt.floor('10T')
    df = df.groupby("EDateTime").first().reset_index()
    return df

def fetch_tidal_height():
    conn = connect_to_db()
    query = """
    SELECT [Height], [EDateTime]
    FROM [dbo].[tbl_TidalData]
    WHERE YEAR([EDateTime]) = YEAR(GETDATE())
    ORDER BY [EDateTime] DESC
    """
    df = pd.read_sql(query, conn)
    conn.close()
    df["EDateTime"] = pd.to_datetime(df["EDateTime"]).dt.floor('10T')
    df = df.groupby("EDateTime").first().reset_index()
    return df

def interpolate_tidal_height(df):
    df["EDateTime"] = pd.to_datetime(df["EDateTime"])
    df = df.sort_values("EDateTime").set_index("EDateTime").resample("10T").asfreq()
    df["Height"] = df["Height"].interpolate(method="pchip").fillna(0)
    return df.reset_index()

def merge_data(water_level_df, water_discharge_df, tidal_height_df):
    merged_df = pd.merge(water_level_df, water_discharge_df, on="EDateTime", how="outer")
    merged_df = pd.merge(merged_df, tidal_height_df, on="EDateTime", how="outer")
    merged_df = merged_df.fillna(method="ffill").fillna(0)
    now = pd.to_datetime("now").floor("10T")
    time_threshold = now - pd.Timedelta(minutes=1440)
    merged_df["ReadingLocationID"] = water_level_df["ReadingLocationID"].iloc[0]
    merged_df = merged_df[(merged_df["EDateTime"] >= time_threshold) & (merged_df["EDateTime"] <= now)]
    return merged_df

def load_model(model_path):
    return joblib.load(model_path)

def get_predictions(model, df, use_discharge):
    def create_features(df, lags=144, use_discharge=False):
        for lag in range(1, lags + 1):
            df[f"WaterLevel_lag{lag}"] = df["WaterLevel"].shift(lag)
        if not use_discharge:
            df = df.drop(columns=["TotalDischarge"], errors='ignore')
        return df.dropna()

    df = create_features(df, use_discharge=use_discharge)
    latest_row = df.iloc[-1].copy()
    latest_row.drop(["ReadingLocationID", "EDateTime", "WaterLevel"], inplace=True)

    static_feats = [latest_row["Height"]]
    if use_discharge:
        static_feats.append(latest_row["TotalDischarge"])
    static_feats = np.array(static_feats)

    lag_cols = [col for col in df.columns if "lag" in col]
    lag_values = latest_row[lag_cols].values.tolist()

    future_predictions = []
    for _ in range(144):
        input_features = np.concatenate([static_feats, lag_values[-144:]])
        next_pred = model.predict([input_features])[0]
        future_predictions.append(next_pred)
        lag_values.append(next_pred)

    forecast_df = pd.DataFrame({
        "EDateTime": [pd.to_datetime("now")],
        "ReadingLocationID": df["ReadingLocationID"].iloc[-1],
        "ActualWaterLevel": df["WaterLevel"].iloc[-1],
        "DamOutFlow": latest_row["TotalDischarge"] if use_discharge else 0,
        "TidalHeight": latest_row["Height"],
    })

    future_predictions = [pred + np.random.uniform(-0.114, 0.114) for pred in future_predictions]

    start_time = pd.to_datetime("now").floor("1T")
    for i in range(144):
        forecast_time = start_time + pd.Timedelta(minutes=(i + 1) * 10)
        forecast_df[forecast_time.strftime("%Y-%m-%d %H:%M")] = future_predictions[i]

    return forecast_df

@app.get("/")
def fetch_water_level_from_api(water_level: float, outflow: float = 0):
    water_level_df = fetch_water_level()
    water_discharge_df = fetch_water_discharge()
    tidal_height_df = fetch_tidal_height()
    tidal_height_df = interpolate_tidal_height(tidal_height_df)

    merged_df = merge_data(water_level_df, water_discharge_df, tidal_height_df)

    new_data = pd.DataFrame({
        "EDateTime": [pd.to_datetime("now")],
        "ReadingLocationID": [1],
        "WaterLevel": [water_level],
        "TotalDischarge": [outflow],
        "Height": [merged_df["Height"].iloc[-1] if not tidal_height_df.empty else 0]
    })

    final_df = pd.concat([merged_df, new_data]).reset_index(drop=True)

    if final_df["TotalDischarge"].iloc[-1] > 0:
        model = load_model("lgbm_model_1d.pkl")
        use_discharge = True
    else:
        model = load_model("lgbm_model_1t.pkl")
        use_discharge = False

    if model:
        predictions_df = get_predictions(model, final_df, use_discharge)
        return predictions_df.to_dict(orient="records")

    return {"error": "Model loading failed"}
