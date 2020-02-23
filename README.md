# **ImInList** - Tu aplicación de listas

**I'm In List** es una aplicación la cual se ha desarrollado para facilitar la gestión y organización de todos los usuarios, creando una aplicación sencilla y amigable para que todo el publico pueda hacer uso de ella.

Desarrollada por alumnos de **2ºDAW** para el proyecto final integrador *2019-2020* con un plazo de 3 semanas lectivas de desarrollo (31 Enero al 21 de Febrero).

---

## **API** 🔩

El proyecto consume datos de una *API* hecha por el tercer integrante del proyecto integrador. Revisa la [documentación de la API](https://github.com/Josee9988/Im-In-List-backend)

---

## **Servidor de desarrollo** 🚀

Primero deberemos clonar el repositorio e instalar todas las dependencias con `npm i`. A continuación para crear un entorno de desarrollo local donde probar nuestra aplicación, será necesario ejecutar el comando `ng serve` para así obtener un servidor de desarrollo. Una vez se estén compilados todos los módulos y configuraciones, en su navegador preferido podrá acceder a `http://127.0.0.1:4200/` y la aplicación estará funcionando.

*En caso de realizar alguna modificación en los archivos, la aplicación se recargará de forma automática.*

---

## **Requisitos para poder ejecutar el entorno de desarrollo** 📋

Deberá de tener instalado los node_modules para poder realizar el entorno de desarrollo. Para obtenerlos, se debe ejecutar `npm i` y automáticamente se instalarán todos los componentes necesarios.

---

## **Estructuración de los componentes** ⌨️

Para generar un nuevo componente en la aplicación, se deberá ejecutar el comando `ng g c components/nombre-componente` para así generar un nuevo componente. Este aparecerá dentro de una carpeta *Components* para mantener el código de forma organizada.

También se pueden generar otros elementos, utilizando el comando `ng generate directive|pipe|service|class|guard|interface|enum|module`.

---

## **Compilación** 🛠️

Una vez haya finalizado el desarollo del código, se ejecutará el comando `ng build` el cual compilara el proyecto.

El proyecto compilado se almacenará en la carpeta `dist/`. Utiliza el flag `--prod` para una compilación de producción.

---

## **Ejecutar pruebas unitarias** ⚙️

Para ejecutar las pruebas unitarias, ejecute el comando `ng test` para realizar las pruebas vía [Karma](https://karma-runner.github.io).

---

## **Despliegue**

Se ha realizado el despliegue utilizando un script sh, el cual permite desplegar en nuestro servidor staging con un usuario front el cual tiene permisos para desplegar en la carpeta /var/www/html/ImInList

El mismo script, nos da la opción de desplegarlo para producción por lo que se compila en modo de producción y se despliega en el otro servidor.

Los datos de los servidres son:
#### Servidor staging:
IP: 54.243.26.179

URL: iminlist.staging.grupo04.ddaw.site

Usuario: front


#### Servidor produción:
IP: 54.165.254.46

URL: iminlist.grupo04.ddaw.site

Usuario: front


---


## **Wiki** 📖

La principal fuente de información ha sido obtenida de la documentación oficial de [Angular](https://angular.io/docs).

Para los estilos, se han utilizando componentes que facilita [Angular Material](https://material.angular.io/components/categories).

---

## **Ayuda** ❓

Puedes ponerte en contacto con nosotros e intentaremos resolver tus dudas con la mayor brevedad posible.

Si quieres obtener más información del funcionamiento de Angular CLI puedes ejecutar el comando `ng help` o si lo prefieres puedes acceder a su documento oficial [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

---

## **Contacto** ✒️

Esta aplicación ha sido desarrollado por:

- Jose Gracia → <jgracia9988@gmail.com>
- Borja Pérez → <multibalcoy@gmail.com>

---

## **Información extra**

- El proyecto final ha concluido con un total de **3841** líneas de código de *TypeScript*, **2061** de *scss* y **1137** de HTML en un plazo de 22 días naturales.

### **Apoya el proyecto** 🥰 🎉

[![Github followers](https://img.shields.io/github/followers/Josee9988.svg?style=social)](Followers)
[![Github stars](https://img.shields.io/github/stars/Josee9988/Im-In-List-FrontEnd.svg?style=social)](Stargazers)
[![Github watchers](https://img.shields.io/github/watchers/Josee9988/Im-In-List-FrontEnd.svg?style=social)](Watchers)
[![Github forks](https://img.shields.io/github/forks/Josee9988/Im-In-List-FrontEnd.svg?style=social)](Forks)

---

*Hecho con mucho ❤️❤️ por **[@Josee9988](https://github.com/Josee9988)** y **[@borj17](https://github.com/borj17)***
