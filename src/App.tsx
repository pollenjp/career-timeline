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
        <ul>
          <li>折りたたみ: 左側のラベルで折りたたむことができます</li>
          <li>垂直スクロール: 左側のラベルにマウスポインターがある状態で <code>Scroll</code></li>
          <li>ズームイン/アウト: timeline 上にマウスポインターがある状態で <code>Ctrl</code> + <code>Scroll</code></li>
          <li>水平スクロール: timeline 上にマウスポインターがある状態で <code>Scroll</code></li>
        </ul>
      </div>
      <VisTimeline />
    </>
  )
}

export default App
