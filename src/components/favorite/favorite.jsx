/* import { useState } from "react"

function Favorite({ props }) {


    const [products, setProducts] = useState("");
    const [favorite, setFavorite] = useState([]); // <= this state holds the id's of all favorite reciepies

    // following function handles the operation of adding fav recipes's id's

    const addToFavorite = id => {
        if (!favorite.includes(id)) setFavorite(favorite.concat(id));
        console.log(id);
    };

    // this one does the exact opposite, it removes the favorite recipe id's
    const removeFavorite = id => {
        let index = favorite.indexOf(id);
        console.log(index);
        let temp = [...favorite.slice(0, index), ...favorite.slice(index + 1)];
        setFavorite(temp);
    };

    // this variable holds the list of favorite recipes, we will use it to render all the fav ecipes
    let findfavorite = products.filter(product => favorite.includes(product.id));

    // filtered list of recipes
    let filtered = products.filter(product => {
        if (products === "") {
            return product;
        } else if (product.title.toLowerCase().includes(products.toLowerCase())) {
            return product;
        }
    });

    return (
        <div className="main">
            <div className="recipe__search">
                <input
                    type="text"
                    onChange={event => {
                        setProducts(event.target.value);
                    }}
                />
            </div>
            <div className="recipe-container">
                <div className="recipe__list">
                    <h2>all recipes</h2>
                    {filtered.map(product => {
                        return (
                            <div key={product.id} className="recipe__card">
                                <img src={product.image} alt="foods" width={50} height={50} />
                                <h2 className="recipe__card__title">{product.title}</h2>
                                <h4 className="recipe__card__info">

                                </h4>
                                <button onClick={() => addToFavorite(product.id)}>
                                    add to favorite
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="favorite__list">
                    <h2>favorite recipes</h2>
                    {findfavorite.map(product => {
                        return (
                            <div key={product.id} className="recipe__card">
                                <img src={product.image} alt="foods" width={50} height={50} />
                                <h2 className="recipe__card__title">{product.title}</h2>
                                <h4 className="recipe__card__info">
                                </h4>
                                <button onClick={() => removeFavorite(product.id)}>
                                    remove favorite
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Favorite; */