import React from 'react'
import "./Home.css"

type Props = {}

const Home = (props: Props) => {
  return (
    <div>
      <div className="title">Order Ease</div>
      <div className="home-description">
        Order Easeは、ノーコードで簡単に注文フォームを作成・公開ができます。
        飲食店や企業が手軽にデジタル化を実現し、プログラミングの知識が不要かつ、更新が楽で、外部ベンダーに依頼する必要がないため、コスト削減にも貢献します。
        多様な販売形態に対応可能な拡張機能も備えた、革新的なソリューションです。
      </div>
    </div>
  )
}

export default Home