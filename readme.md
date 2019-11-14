# Install 

Run the next command to install the dependencies.
```
npm install
``` 


# ENV

create a `.env` file in your root folder and add the next vars like this
```
REACT_APP_API_HOST=http://localhost:5000
REACT_APP_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
REACT_APP_FIREBASE_PROJECT_ID=advanced-flutter-257300
REACT_APP_FIREBASE_AUTH_DOMAIN=advanced-flutter-257300.firebaseapp.com
REACT_APP_FIREBASE_STORAGE_BUCKET=gs://advanced-flutter-257300.appspot.com
```

# FIRESABSE CONFIG
Go to your firebase console account and create one project.
Next add add firebase to your web
##
<img width="402" alt="Captura de Pantalla 2019-11-13 a la(s) 07 15 26" src="https://user-images.githubusercontent.com/15864336/68763024-6ba75700-05e5-11ea-9045-11289b49a7f5.png">

After add firebase to your web you can see this screen

![ap](https://user-images.githubusercontent.com/15864336/68763428-65fe4100-05e6-11ea-8ccf-8ab0c8a65c18.jpg)


##
Now you can get yours `apiKey`,`projectId`,`authDomain`,`storageBucket`


Now go to `Autentication > Access Method` and enable `Anonymous`
<img width="962" alt="Captura de Pantalla 2019-11-13 a la(s) 07 32 31" src="https://user-images.githubusercontent.com/15864336/68764171-2c2e3a00-05e8-11ea-9ab2-91aa6c7b44ac.png">

Now go to `Storage` and click on `Start` and then enable your firebase storage
<img width="1667" alt="Captura de Pantalla 2019-11-13 a la(s) 07 36 33" src="https://user-images.githubusercontent.com/15864336/68764283-6ac3f480-05e8-11ea-9852-8f16f9570f3d.png">


# Run
just run
```
npm start
```



