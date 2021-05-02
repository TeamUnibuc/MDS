import os

# In case we want to use .env files. Currently just place default values in the 
# ENV_DEFAULT variable

# from dotenv import load_dotenv

# load_dotenv()  # take environment variables from .env.

ENV_DEFAULT = {
    'PORT': '4242'
}

def getEnv(key: str, default: str = "") -> str:
    env_val = os.getenv(key)
    if env_val is not None:
        return env_val
    if key in ENV_DEFAULT:
        return ENV_DEFAULT.get(key)
    return default