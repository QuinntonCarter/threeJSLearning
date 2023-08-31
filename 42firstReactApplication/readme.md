## useMemo

_when component re-renders, useMeme will be called again_ 1. If the values in dependencies array haven't changed, **_useMemo_** will return the previous value without calling the function. 2. If one fo the values in the dependencies array have changed, **_useMemo_** will call the function again

> Typically used to handle complex calculations and prevent said calculation from happening on each draw unless it's really necessary (if dependency variable has changed)

```
const colors = useMemo(() => {
const colors = [];
for(let i = 0; i < clickersCount; i++){
	colors.push(`hsl(${Math.random() * 360}deg, 100%, 70%`)
return colors
}, [clickersCount])

```

_If no dependencies are provided, will only use useMemo once on mount (like useEffect)_ + _Works similar to cache_

## useRef

_used to reference a specific DOM element_

```
const buttonRef = useRef()

return (
	<>
		<button ref={buttonRef}> </button>
	</>
)

console.log(buttonRef.current) => button (DOM element (after initial loads of parent component(s)))
```

if want to only have access to ref when populated, put associated ref actions inside useEffect

```
useEffect(() => {
	buttonRef.current.style.backgroundColor = 'yellow'
	buttonRef.current.style.color = 'salmon'
}, [])
```
