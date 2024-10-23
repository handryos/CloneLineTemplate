# About

This component is used to render and manipulate dynamically the fields with Hookform

## Requirements

MUI and HookForm

```bash
npm i react-hook-form @mui/material
```

## Usage

```typescript
<CloneLineTemplate minRender={1} arrayName={"pagesList"}> <Item name={"."} /> //This will be the children that will be cloned, i recommend make a new tsx file and pass the name in prop
```

### Like this
```typescript
//Example of a new tsx with the name in props
export default function Item({ name }: any) { return <MainTextField name={name + ".teste"} />; //Here you put anything that you want be cloned, im using a form elements, like inputs, controlled by hookform }
```
