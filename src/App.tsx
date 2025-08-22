import VisTimeline from './timeline/timeline'

function App() {
  return (
    <>
      <h1>pollenJP Career Timeline</h1>
      <div>
        <a href="https://pollenjp.github.io">HOME</a>
      </div>
      <div>
        操作方法:
        {/* timeline領域をクリックしてフォーカスモードに入ることで操作できるようになります */}
        <ul>
          <li><strong>ボタン操作</strong>: 画面右下のボタンからズームと移動ができます</li>
          <li><strong>マウスモード</strong>: timeline 上で一度クリックするとマウスモードに有効になります (<code>ESC</code>で解除)
            <ul>
              <li>左側のラベルをクリック → <strong>折りたたみ</strong></li>
              <li>timeline 上にマウスポインターがある状態で <code>Scroll</code> → <strong>水平スクロール</strong></li>
              <li>timeline 上にマウスポインターがある状態で <code>Ctrl</code> + <code>Scroll</code> → <strong>ズームイン/アウト</strong></li>
              <li>左側のラベルにマウスポインターがある状態で <code>Scroll</code> → <strong>垂直スクロール</strong></li>
            </ul>
          </li>
        </ul>
      </div>
      <VisTimeline />
    </>
  )
}

export default App
