/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@keystone-ui/core';

const packageJson = require('../package.json');

function CustomLogo () {
    return <h3>Lion and fox <div css={{fontSize: '10px'}}>{packageJson.version}</div></h3>
}

export const components = {
 Logo: CustomLogo
}