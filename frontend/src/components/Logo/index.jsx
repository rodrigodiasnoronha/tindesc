import React, { Fragment } from 'react'
import styled from 'styled-components'

import logo from '../../assets/tindesc.png'

const LogoWrapper = styled.div`

`

const Logo = () => {
    return (
        <Fragment>
            <LogoWrapper className="navbar-brand">
                <img src={logo} alt="logo" height="50" />
            </LogoWrapper>

            <button className="navbar-toggler" data-target="#nav" data-toggle="collapse">
                <span className="navbar-toggler-icon"></span>
            </button>
        </Fragment>
    )
}

export default Logo