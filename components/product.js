app.component("product-display", {
  setup() {
    const stock = 10;
    const image = ref("assets/images/t-shirt-blue.png");
    const title = "T-shirt (Blue)";
    const brand = "Volcon";
    const details = ["50% Cotton", "30% Polyester", "20% Wool"];
    const variants = [
      { id: 1, color: "blue", image: "assets/images/t-shirt-blue.png" },
      { id: 2, color: "red", image: "assets/images/t-shirt-red.png" },
    ];

    const changeImage = (color) => {
      image.value = color;
    };

    const titleWithBrand = computed(() => {
      return `${title} - ${brand}`;
    });

    const inStock = computed(() => {
      if (stock > 10) {
        return "In Stock";
      } else if (stock >= 1) {
        return "Almost of Out";
      } else {
        return "Out of Stock";
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
                    <li
                        v-for="(detail, index) in details"
                        :key="index"
                    >
                        {{ detail }}
                    </li>
                </ul>
                <div
                    class="color-circle"
                    v-for="{id, color, image} in variants"
                    :key="id"
                    :style="{ 'background-color': color}"
                    @click="changeImage(image)">
                </div>
                <button
                    @click="$emit('add-cart')"
                    :disabled="inStock < 1"
                >
                    Add on Cart
                </button>
            </div>
        </div>
    </div>
    `,
});
