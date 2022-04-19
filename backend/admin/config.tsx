/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';

const p = require('../package.json');

function CustomLogo () {
    return <h3>Lion and fox <div css={{fontSize: '10px'}}>{p.version}</div></h3>
}

export const components = {
 Logo: CustomLogo
}