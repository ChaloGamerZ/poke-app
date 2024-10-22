# PokeApp

PokeApp es una aplicación web que permite buscar información sobre Pokémon utilizando la PokeAPI. La aplicación muestra detalles como la imagen del Pokémon, su descripción y su cadena evolutiva.

## Características

- **Búsqueda de Pokémon:** Busca cualquier Pokémon por nombre.
- **Detalles de Pokémon:** Muestra imagen, descripción y evoluciones del Pokémon seleccionado.
- **Interfaz Estilizada:** Una apariencia inspirada en la Pokédex, con colores rojo y blanco.

## Tecnologías Utilizadas

- **React:** Librería principal para construir la interfaz de usuario.
- **TypeScript:** Tipado estático para un código más robusto.
- **Redux:** Gestión del estado global de la aplicación.
- **Axios:** Para realizar solicitudes HTTP a la PokeAPI.
- **Styled-Components:** Para estilizar los componentes con CSS en JS.
- **React-Select:** Para el autocompletado en la búsqueda de Pokémon.
- **Docker:** Contenerización de la aplicación para un despliegue fácil y consistente.

## Instalación y Ejecución

### Prerrequisitos

Asegúrate de tener instalado:
- Node.js
- Docker

### Pasos de Instalación

1. Clona el repositorio:

    ```sh
    git clone https://github.com/tu-usuario/pokeapp.git
    cd pokeapp
    ```

2. Instala las dependencias:

    ```sh
    npm install
    ```

3. Inicia la aplicación en modo de desarrollo:

    ```sh
    npm start
    ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Contenerización con Docker

1. Construye la imagen Docker:

    ```sh
    docker build -t pokeapp .
    ```

2. Ejecuta el contenedor:

    ```sh
    docker run -p 3000:3000 pokeapp
    ```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Uso

1. Abre la aplicación en tu navegador.
2. Usa la barra de búsqueda para encontrar un Pokémon por nombre.
3. Haz clic en las sugerencias para ver los detalles del Pokémon.
4. Explora la descripción y las evoluciones del Pokémon seleccionado.
