<template>
    <div class="hello">
        <a @click="drawCanvas()">html2canvas</a>
        <a @click="drawSvg()">drawSvg</a>
        <a @click="drawSvgByrasterizeHTML()">rasterizeHTML</a>
        <div ref="vs" class="vs">
            <img alt="Vue logo" src="@/assets/logo.png">
            <p style='color: white; text-shadow: 0 0 2px blue;font-size:50px;'>just try</p>
            <p class="p">just try</p>
            <div>
                <span class="iconfont icon-arrow-left"></span>
                <span>
                    <h1>{{ msg }}</h1>
                </span>
                <span class="iconfont icon-arrow-right"></span>
            </div>
        </div>
        <img :src="imgSrc" ref="img">
    </div>
</template>

<script>
import "animate.css";
import html2canvas from 'html2canvas';
import * as rasterizeHTML from 'rasterizehtml';
export default {
    name: "Hello",
    props: {
        msg: String
    },
    data() {
        return {
            imgSrc: '',
        }
    },
    methods: {
        html2Svg(domStr) {
            //创建模版字符串
            var svgXML =
                `<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="500">
                <foreignObject width="100%" height="100%">
                    <body xmlns="http://www.w3.org/1999/xhtml">
                        ${domStr.innerHTML}
                    </body>
                </foreignObject>
             </svg>`
            //利用Blob创建svg
            var svg = new Blob([svgXML], { type: 'image/svg+xml' })
            //利用DOMURL.createObjectURL取出对象
            var url = window.URL.createObjectURL(svg);
            return url;
        },
        drawSvg() {
            this.imgSrc = this.html2Svg(this.$refs.vs);
        },
        drawCanvas() {
            let vm = this;
            html2canvas(this.$refs.vs, {
                useCORS: true,
            }).then((canvas) => {
                let canvas2img = canvas.toDataURL('image/png');
                vm.imgSrc = canvas2img;
            });
        },
        drawSvgByrasterizeHTML() {
            let vm = this;
            rasterizeHTML.drawHTML(this.$refs.vs.innerHTML, undefined, {
                width: 1000,
                height: 500,
                executeJs: true, // 是否执行页面js
                executeJsTimeout: 200,
            }).then((renderResult) => {
                //利用Blob创建svg
                let svg = new Blob([renderResult.svg], { type: 'image/svg+xml' })
                //利用DOMURL.createObjectURL取出对象
                let url = window.URL.createObjectURL(svg);
                vm.imgSrc = url;
            });
        },
    }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
    font-size: 20px;
}

.hello {
    overflow: hidden;
    >a {
        margin: 10px;
        display: inline-block;
        cursor: pointer;
    }
    >img {
        width: 500px;
    }
    .vs {
        img {
            width: 100px;
        }
        .p {
            color: white;
            text-shadow: 0 0 2px blue;
            font-size: 50px;
        }
    }
}

.iconfont {
    font-size: 36px;
    &:hover {
        color: rgb(42, 200, 221);
        cursor: pointer;
    }
}

span {
    display: inline-block;
}
</style>