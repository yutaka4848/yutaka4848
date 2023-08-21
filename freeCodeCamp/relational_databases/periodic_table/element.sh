#!/bin/bash
# Periodic Table interface

PSQL="psql -U freecodecamp -d periodic_table -tAc"

if [[ -z $1 ]]
then
    echo Please provide an element as an argument.
else
    if [[ $1 =~ ^[0-9]+$ ]]
    then
        # if argument is a number
        ATOMIC_PROPS="$($PSQL "SELECT * FROM elements INNER JOIN properties USING(atomic_number) INNER JOIN types USING(type_id) WHERE atomic_number = $1")"
    elif [[ $1 =~ ^[A-Z][a-zA-Z]?$ ]]
    then
        # if argument is a symbol of element
        ATOMIC_PROPS="$($PSQL "SELECT * FROM elements INNER JOIN properties USING(atomic_number) INNER JOIN types USING(type_id) WHERE symbol = '$1'")"
    elif [[ $1 =~ ^[a-zA-Z]{2,}$ ]]
    then
        #if argument is a name of element
        ATOMIC_PROPS="$($PSQL "SELECT * FROM elements INNER JOIN properties USING(atomic_number) INNER JOIN types USING(type_id) WHERE name = '$1'")"
    fi

    if [[ -z $ATOMIC_PROPS ]]
    then
        echo I could not find that element in the database.
    else
        echo $ATOMIC_PROPS | sed -E "s/(\w+)\|/\1 /g" | while read -a VAL
        do
            echo "The element with atomic number ${VAL[1]} is ${VAL[3]} (${VAL[2]}). It's a ${VAL[7]}, with a mass of ${VAL[4]} amu. ${VAL[3]} has a melting point of ${VAL[5]} celsius and a boiling point of ${VAL[6]} celsius."
        done
    fi
fi

