import sqlite3

connection = sqlite3.connect("learnpilot.db")

tables = connection.execute(
    "SELECT name FROM sqlite_master WHERE type='table'"
).fetchall()

print("TABLES:")
for table in tables:
    print(table[0])

print("\nBOOKS COLUMNS:")

columns = connection.execute(
    "PRAGMA table_info(books)"
).fetchall()

for column in columns:
    print(column)

connection.close()