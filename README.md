# ionic-firebase-login
Aplicación de Ionic 5 utilizando Auth de Firebase

# Instalación
```
npm install
```

# Importante
Se debe crear los token para utilizar el firebase, y agregarlos en enviroments/enviroment.ts y enviroments/enviroment.prod.ts
```
export const environment = {
  production: true,
  firebase: {
    apiKey: 'xxxxxxx',
    databaseURL: 'xxxxxxx',
    projectId: 'xxxxxxx',
  }
};
```
