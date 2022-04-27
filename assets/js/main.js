Vue.createApp({
  data() {
    return {
      markdownArticle: null,
      jsondata: {},
      link: {},
    };
  },
  methods: {
    getJsonData() {
      axios
        .get('https://raw.githubusercontent.com/ulanret/tekweb2022/main/assets/json/article.json')
        .then((res) => {
          // console.log(res.data);
          this.jsondata = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMarkdownLink() {
      var converter = new showdown.Converter();
      axios
        .get('https://raw.githubusercontent.com/ulanret/tekweb2022/main/assets/json/article.json')
        .then((res) => {
          for (var i of Object.keys(res.data)) {
            this.link = res.data[i].markdown;
            console.log(this.link);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async toTheMarkdown() {
      var converter = new showdown.Converter();
      const config = {
        method: 'get',
        url: '',
      };

      let res = await axios(config);
      var html = converter.makeHtml(res.data);
      this.markdownArticle = html;

      if (res.status === 200) {
        console.log('Data Retrieved');
      }
      // console.log(this.markdownArticle);
      // console.log(res.status);
    },
  },
  beforeMount() {
    this.toTheMarkdown();
    this.getJsonData();
    this.getMarkdownLink();
  },
}).mount('#app');
