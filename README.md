# pod-proxy

A simple `http-proxy`-based proxy for running [pod](https://github.com/yyx990803/pod)-based apps on a VPS.

Reads the `~/.podrc` and proxies ports to the `domain` value for each `app`.
