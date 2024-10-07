import React, { PropsWithChildren, ReactNode } from "react";

export type FCChildrenOf<P> = React.FunctionComponent<PropsWithChildren<P>>
export type StrictChildren<P extends ReactNode> = Exclude<P, string|number|boolean|null>
export type WithChildren<T = {}> = T & { children?: React.ReactNode };
export type ElementOf <P extends (...args: any) => any> = ReturnType<P>