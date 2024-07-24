<template>
  <div v-html="renderedMarkdown" class="markdown-body bg-transparent"></div>
</template>

<script>
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeHighlightLines from "rehype-highlight-code-lines";
import { unified } from "unified";
import remarkGfm from "remark-gfm";
import "@floatsheep/macaron-github-markdown-css";
import "@floatsheep/macaron-github-markdown-highlight";

export default {
  name: "markdownRenderer",
  props: {
    markdownContent: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      renderedMarkdown: "",
    };
  },
  methods: {
    async renderMarkdown() {
      const remarkOut = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeHighlight)
        .use(rehypeHighlightLines, {
          showLineNumbers: true,
        })
        .use(rehypeStringify)
        .process(this.markdownContent);

      this.renderedMarkdown = String(remarkOut);
    },
  },
  mounted() {
    this.renderMarkdown();
  },
};
</script>

<style scoped>
.bg-transparent {
  background-color: transparent !important;
}
</style>
