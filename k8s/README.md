#K8

start the nginx controller first
```
kubectl apply -f k8s/ingress-cloud
```

Then start the app after the ingress controller is up
```
kubectl apply -f k8s
```

stop the app
```
kubectl delete -f k8s
```

stop the nginx controller
```
kubectl delete -f k8s/ingress0cloud
```
