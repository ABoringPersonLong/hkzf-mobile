import './index.scss'
import {useNavigate} from 'react-router-dom'
import {NavBar} from 'antd-mobile'

// NavHeader 组件的类型
type Props = { children: string; onBack?: () => void }

// NavHeader 组件
const NavHeader = ({children = '标题', onBack}: Props) => {
  // 使用编程式跳转
  const navigate = useNavigate()

  // 默认的 onBack 事件处理函数
  const defaultHandleBack = () => navigate(-1)

  return (
    <div className='nav-header-container'>
      <NavBar onBack={onBack || defaultHandleBack}>{children}</NavBar>
    </div>
  )
}

export default NavHeader
