#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.
FILENAME="games.csv"

echo "$($PSQL "TRUNCATE teams, games RESTART IDENTITY")"
cat $FILENAME | while IFS="," read YEAR ROUND WIN OPN WIN_GOALS OPN_GOALS
do
    if [[ $YEAR != "year" ]]; then
        # Check enrolled winner teams
        WIN_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$WIN'")
        if [[ $WIN_ID == "" ]]; then
            # Enroll winner team
            echo "$($PSQL "INSERT INTO teams (name) VALUES ('$WIN') ")"
            WIN_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$WIN'")
        fi

        # Check enrolled opponent teams
        OPN_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$OPN'")
        if [[ $OPN_ID == "" ]]; then
            # Enroll opponent team
            echo "$($PSQL "INSERT INTO teams (name) VALUES ('$OPN') ")"
            OPN_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$OPN'")
        fi

    echo "$($PSQL "INSERT INTO games (year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES ($YEAR, '$ROUND', $WIN_ID, $OPN_ID, $WIN_GOALS, $OPN_GOALS)")"
        

    fi
done
