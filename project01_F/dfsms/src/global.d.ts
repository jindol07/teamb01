//ts에서 필요한 모듈을 선언
declare module '*.module.css'{
    const classes: {[key:string] : string}
    export default classes
}
//ex) signup.module.css 형식으로 모듈이 인식되게끔 선언한다.

declare module 'slick-carousel/slick/*.css'