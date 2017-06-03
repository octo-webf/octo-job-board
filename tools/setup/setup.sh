#!/bin/bash

set -e

dotenv_file_path=".env"
dotenv_sample_path="./tools/setup/sample.env"

NORMAL="\033[39m"
CYAN="\033[96m"
GREEN="\033[32m"
YELLOW="\033[93m"

# check if .env file exists
if [ -f "$dotenv_file_path" ]; then
	echo -e "File $CYAN.env$NORMAL already exists."

	# prompt user if .env file should be removed and created again
	read -p "$(echo -e "Reinitialize .env file? $GREEN(Y|n)$NORMAL") " reset_file
	echo ""

	# if answer is "yes" or "empty" (default choice), delete .env file
	if [ ! "$reset_file" ] || [ "Y" == "$reset_file" ]; then
		rm "$dotenv_file_path"

	# if answer is "no" or "incorrect", exits in success
	else
		echo -e "$CYAN\tUnchanged:$NORMAL .env"
		echo ""
		exit 0
	fi
fi

cp "$dotenv_sample_path" "$dotenv_file_path"
echo -e "$GREEN\tCreated:$NORMAL  .env"
echo ""
echo -e "\033[93mWarning!$NORMAL think to edit the $CYAN.env$NORMAL file and define the application properties before continuing."
echo ""
exit 0
