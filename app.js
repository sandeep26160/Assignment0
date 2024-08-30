
const { createApp, ref, watch } = Vue;

const App = {
  setup() {
    const query = ref(''); // Search query
    const searchResults = ref([]); // Search results
    const isLoading = ref(false); // Loading state

    // Fetch data from backend (Laravel) or API
    const fetchSearchResults = async () => {
      if (query.value.length > 3) {
        isLoading.value = true;
        try {
          const response = await fetch(`/api/search?query=${query.value}`);
          searchResults.value = await response.json();
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          isLoading.value = false;
        }
      } else {
        searchResults.value = [];
      }
    };

    // Watch for changes in the query
    watch(query, fetchSearchResults);

    return { query, searchResults, isLoading };
  },
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">Clothing Store</h1>
      <div class="relative">
        <input
          v-model="query"
          type="text"
          placeholder="Search for clothing..."
          class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div v-if="isLoading" class="absolute right-0 top-0 mt-3 mr-4">
          <span class="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full"></span>
        </div>
      </div>
      <div v-if="searchResults.length" class="mt-4 bg-white shadow-lg rounded-lg">
        <ul>
          <li v-for="item in searchResults" :key="item.id" class="p-4 border-b border-gray-200">
            <h3 class="font-bold">{{ item.name }}</h3>
            <p class="text-sm text-gray-500">{{ item.description }}</p>
            <span class="text-lg font-semibold text-indigo-600">{{ item.price | currency }}</span>
          </li>
        </ul>
      </div>
    </div>
  `
};

createApp(App).mount('#app');
