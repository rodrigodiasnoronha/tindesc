import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
    .bg-rosinha { background-color: #c2185b }
`

const Header = (props) => {
    return (
        <HeaderWrapper >
            <header className="navbar navbar-expand-sm navbar-light bg-light">
                {props.children}
            </header>
        </HeaderWrapper>
    )
}

export default Header // 