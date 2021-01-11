import React, { createContext, useCallback, useState } from 'react';
import WebSocketServer from './WebSocketTool';
export const WebSocketServerContext = createContext({} as WebSocketServer);