import { useState, useEffect } from "react"

export function Listado () {
    
    const [data, setData] = useState([]);
    const [pokemonDetails, setPokemonDetails] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon')
            .then(response => response.json())
            .then(data => {
                setData(data.results);
            })
            .catch(error => {
                console.error('Error al cargar los datos de la API:', error);
            });
    }, []);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            const details = await Promise.all(data.map(pokemon => fetch(pokemon.url).then(response => response.json())));
            setPokemonDetails(details);
        };

        fetchPokemonDetails();
    }, [data]);
    console.log(pokemonDetails);

    return (
        <section className="mx-auto md:w-5/6 my-10 max-w-screen-xl">
            <h1 className="px-3 md:px-0 text-4xl font-bold">Listado de Pokemons</h1>

            <ul className="grid px-3 md:px-0 gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 place-items-center mt-10">
                {data.map((item, index) => (
                    <li key={item.name} className="border border-blue-300 p-3 rounded-xl shadow-md shadow-blue-400 hover:scale-110 transition-transform">
                        {pokemonDetails[index] ? (
                            <div className="flex flex-wrap flex-col ">
                                <img className="w-64" src={pokemonDetails[index].sprites.front_default} alt={item.name} />
                                <h2 className="text-center text-xl font-bold text-blue-800">{item.name}</h2>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-bold mt-2 text-blue-950">ID: {pokemonDetails[index].id}</p>
                                    <p className="text-sm font-bold mt-2 text-blue-950">base: {pokemonDetails[index].base_experience}</p>
                                </div>
                            </div>
                        ) : (
                            <p>Cargando detalles...</p>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}
