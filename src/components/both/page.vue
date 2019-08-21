<template>
  <div>
    <nav aria-label="Page navigation" class="my-5">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{'disabled' : !pagedata.has_pre}">
          <a
            class="page-link"
            href="#"
            tabindex="-1"
            @click.prevent="chosepage(pagedata.current_page-1)"
          >Previous</a>
        </li>

        <li
          class="page-item"
          v-for="item in pagedata.total_pages"
          :key="item"
          :class="{'active' : pagedata.current_page === item}"
        >
          <a class="page-link" href="#" @click.prevent="chosepage(item)">{{ item }}</a>
        </li>
        <li class="page-item" :class="{'disabled' : !pagedata.has_next}">
          <a class="page-link" href="#" @click.prevent="chosepage(pagedata.current_page+1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["pagedata"],
  methods: {
    chosepage(page) {
      this.$emit("chosepage", page);
    }
  }
};
</script>