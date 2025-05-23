'''
Pandas to handle data
'''
import pandas as pd

def datify(file, config: dict) -> dict:
    '''
    Data as desired
    '''
    # turn it into a dataframe
    df = pd.read_csv(file) if parse_file(file) else pd.read_excel(file)

    # parse according to config
    # get only selected columns
    df = df[[column for column in config["columns"]]]

    # combine ?
    if config["combine"]:
        df = combine(df, config["key"])

    return df.to_dict(orient="records")

def get_columns(file, filename: str) -> list:
    '''Gets all the column names from file'''
    df = pd.read_csv(file) if parse_file(filename) else pd.read_excel(file)

    return df.columns.tolist()

def parse_file(filename: str) -> bool:
    '''Returns whether or not file is a csv. If csv==True, if xlsx==Fale, else ERROR'''
    if filename.endswith(".csv"):
        return True
    elif filename.endswith(".xlsx"):
        return False
    
    return ValueError(f"{filename} not a valid file type.")

def clean(data: pd.DataFrame) -> pd.DataFrame:
    '''Cleans up data in place to return'''
    # drop empty rows/cols
    data.dropna(how='all', inplace=True)            # rows
    data.dropna(axis=1, how='all', inplace=True)    # columns

    # strip whitespace from headers
    data.columns = data.columns.str.strip()

    # handle missing values
    data.fillna('', inplace=True)

    # rename columns for consistency
    data.rename(columns=lambda x: x.strip().lower().replace('_', ' '), inplace=True)

    # trim string columns
    for col in data.select_dtypes(include='object'):
        data[col] = data[col].str.strip()

    return data

def combine(data: pd.DataFrame, key: str) -> pd.DataFrame:
    '''Group data by key and combine only specific columns'''
    result = data.groupby(key).agg('sum').reset_index()

    return result