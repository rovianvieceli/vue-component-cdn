app.component("product-display", {
  setup() {
    const stock = 10;
    const image = ref("assets/images/t-shirt-blue.png");
    const title = ref("Camiseta (Blue)");
    const brand = "Marca";
    const details = ["50% Algodão", "30% Poliéster", "20% Lã"];
    const variants = [
      { id: 1, color: "blue", name: 'Azul', image: "assets/images/t-shirt-blue.png" },
      { id: 2, color: "red", name: 'Vermelho', image: "assets/images/t-shirt-red.png" },
    ];

    const changeImage = (id) => {
      const variant = variants.find((item) => item.id === id);

      image.value = variant.image;
      title.value = `Camiseta (${variant.name})`;
    };

    const titleWithBrand = computed(() => {
      return `${title.value} - ${brand}`;
    });

    const inStock = computed(() => {
      if (stock > 10) {
        return "Em estoque";
      } else if (stock >= 1) {
        return "Poucos itens em estoque";
      } else {
        return "Sem estoque";
      }
    });

    return {
      title,
      image,
      details,
      variants,
      inStock,
      titleWithBrand,
      changeImage,
    };
  },

  template: `
    <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img :src="image" :alt="title">
            </div>
            <div>
                <h1>{{ titleWithBrand }}</h1>
                <p>{{ inStock }}</p>
                <ul>
                    <li v-for="(detail, index) in details" :key="index">
                        {{ detail }}
                    </li>
                </ul>
                <div
                    class="color-circle"
                    v-for="{id, color} in variants"
                    :key="id"
                    :style="{ 'background-color': color}"
                    @click="changeImage(id)">
                </div>
                <button
                    @click="$emit('add-cart')"
                    :disabled="inStock < 1"
                >
                  Adicionar ao Carrinho
                </button>
            </div>
        </div>
    </div>
    `,
});
