#!/bin/bash
# Salon Appointment scheduler

echo -e "\n~~~ Salon appointment ~~~\n"
PSQL="psql --username=freecodecamp --dbname=salon -tA -c"

SERVICE_LIST=$($PSQL "SELECT service_id, name FROM services")

echo -e "Welcome to my salon, how can I help you?\n"

MAIN_MENU(){
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi

  # echo "$($PSQL "SELECT service_id, name FROM services")" | while IFS="|" read SERVICE_NUMBER SERVICE
  # do
  #   echo "$SERVICE_NUMBER) $SERVICE"
  # done 

  echo $SERVICE_LIST | sed "s/ /\n/g; s/|/) /g"

  # select service id
  read SERVICE_ID_SELECTED

  # if not a number
  if [[ ! $SERVICE_ID_SELECTED =~ ^[0-9]+$ ]]
  then
    MAIN_MENU "Select a number from listed above."
  else
    # get service name from number
    SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id = $SERVICE_ID_SELECTED")
    echo $SERVICE_NAME
    # if number is not exist
    if [[ -z $SERVICE_NAME ]]
    then
      MAIN_MENU "There is no such a number."
    else
      # phone number
      echo -e "\nYour phone number is"
      read CUSTOMER_PHONE
      
      # customer name from customer phone number 
      CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$CUSTOMER_PHONE'")
      # if not exist, 
      if [[ -z $CUSTOMER_NAME ]]
      then
        echo This is your first appointment. Please show me your name.
        read CUSTOMER_NAME
        echo "$($PSQL "INSERT INTO customers (phone, name) VALUES ('$CUSTOMER_PHONE', '$CUSTOMER_NAME')")"
      fi
      echo Dear $CUSTOMER_NAME. Welcome.

      # time for appointment
      echo -e "Your appointment time is (ex. 13:30)"
      read SERVICE_TIME

      CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$CUSTOMER_PHONE' AND name = '$CUSTOMER_NAME'")

      APPOINTMENT_RESULT=$($PSQL "INSERT INTO appointments (customer_id, service_id, time) VALUES ($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')")

      echo -e "\nI have put you down for a $SERVICE_NAME at $SERVICE_TIME, $CUSTOMER_NAME."

    fi
  fi

}

MAIN_MENU
