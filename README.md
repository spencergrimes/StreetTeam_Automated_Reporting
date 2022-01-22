# StreetTeam_Automated_Reporting

## Setup dev environment
1- Install clasp (https://developers.google.com/apps-script/guides/clasp)

2- `clasp login`

	opens up a browser window where you choose your google account that clasp will authenticate itself as. You will also give clasp a number of permissions which allow it (amongst other things) to deploy google app scripts to your google account.

3- Turn on 3rd party support in scripts : (https://script.google.com/home/usersettings) and set Google Application Script API to "On".

4- `clasp clone <script-id>`

	clones your script project to the current directory. If you only have the default script (Code.gs) in your project this will clone Code.js and appsscript.json to your current directory. .gs scripts are renamed to .js when cloned. appsscript.json is the project manifest.

	To get the script project id, open the script editor, go to File->Project properties->Info and copy the 'Script ID' you find in there.

5- `npm i @types/google-apps-script`

	installs the Google Application Script libraries which enable Visual Studio Code to autocomplete Google Application Script classes and methods. Do this in the same directory as you cloned your script project.

7- Edit the script project in Visual Studio Code.

8- `clasp push`
