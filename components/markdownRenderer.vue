<template>
  <div v-html="renderedMarkdown" class="markdown-body"></div>
</template>

<script>
import "github-markdown-css";
import { marked } from "marked";

export default {
  name: "markdownRenderer",
  props: {
    markdownContent: {
      type: String,
      required: true,
    },
  },
  computed: {
    renderedMarkdown() {
      return marked(this.markdownContent);
    },
  },
};
</script>
