<template>
  <div id="mse"></div>
</template>

<script setup lang="ts" name="Player">
import { onMounted } from "vue";
import Player from "xgplayer";
import "xgplayer/dist/index.min.css";

const props = defineProps({
  lang: {
    type: String,
    default: 'zh',
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
    default: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
  },
  poster: {
    type: String,
    default: '//lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/poster.jpg',
  },
});

onMounted(() => {
  new Player({
    id: "mse",
    autoplay: props.autoplay,
    volume: 0.3,
    lang: props.lang,
    url: props.url,
    poster: props.poster,
    playsinline: true,
    thumbnail: {
      pic_num: 44,
      width: 160,
      height: 90,
      col: 10,
      row: 10,
      urls: ["//lf3-static.bytednsdoc.com/obj/eden-cn/nupenuvpxnuvo/xgplayer_doc/xgplayer-demo-thumbnail.jpg"]
    },
    danmu: {
      comments: [
        {
          duration: 0,
          id: "1",
          start: 3000,
          txt: "长弹幕长弹幕长弹幕长弹幕长弹幕",
          style: {
            //弹幕自定义样式
            color: "#ff9500",
            fontSize: "20px",
            border: "solid 1px #ff9500",
            borderRadius: "50px",
            padding: "5px 11px",
            backgroundColor: "rgba(255, 255, 255, 0.1)"
          }
        }
      ],
      area: {
        start: 0,
        end: 1
      }
    },
    height: "100%",
    width: "100%"
  });
});
</script>

