# clipboard.js
- clipboardData, execCommand 메서드를 통한 클립보드 복사 기능 구현.
- 미지원 브라우저에서 prompt 창을 통한 카피텍스트 노출.

## 사용법

### 기본

```javascript
new Clipboard('selector', {
    text: 'message'
});
```

### Options

```javascript
@text // 복사할 키워드    
@promptMsg // prompt 창 안내 메시지 (default: '해당 문구를 복사해주세요.')    
@callback // 콜백 함수 (default: function(){ alert('클립보드에 해당 문구가 복사되었습니다.')} )
```

### Method

```javascript
Clipboard.copy() // 메서드를 통한 복사 실행
Clipboard.initOption(options) // 옵션 변경    
Clipboard.reset() // 클립보드 기능 제거(초기화)
```

## 주의사항
- 일치하는 선택자가 2개 이상일 경우 첫 element 요소에 적용됨.

## 브라우저 호환
### Desktop
  <center>IE</center> |  <center>Chrome</center> |  <center>Firefox</center> | <center>Safari</center>
------------ | ------------- | ------------- | -------------
 <center>8+</center> | <center>42+</center> | <center>41+</center> | <center>10+</center>

> ID Selector 사용 시 IE 모든 버전 호환

> jQuery 환경일 시 IE 모든 버전 호환

### Mobile
  <center>Samsung Internet</center> |  <center>Chrome for Android</center> |  <center>Firefox Mobile</center> | <center>Safari Mobile</center>
------------- | ------------- | ------------- | -------------
 <center>6.4+</center> | <center>42+</center> | <center>41+</center> | <center>10+</center>


> SamsungInternet : 6.4 미만 버전 호환 체크 필요