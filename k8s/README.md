#K8

start the nginx controller first
```
kubectl apply -f k8s/ingress-cloud
```

Then start the app **ONCE** the ingress controller is up
```
kubectl apply -f k8s
```

Visit http://localhost to access the site

stop the app
```
kubectl delete -f k8s
```

stop the nginx controller last
```
kubectl delete -f k8s/ingress-cloud
```
