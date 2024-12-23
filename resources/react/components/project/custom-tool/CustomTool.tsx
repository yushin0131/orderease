import React, { useEffect, useRef, useState } from 'react'
import "./CustomTool.css"
import { CustomToolCard, CustomToolCardProps } from './custom-tool-card/CustomToolCard'
import { useShared } from '../../useShared'

type Props = {}

const CustomTool = (props: Props) => {
  const {user}=useShared.states();
  const [extensionTools]=useState(user?.customTools);

  // const extensionTools:CustomToolCardProps[]=[
  //   {
  //     id:1,
  //     title:"test",
  //     thumbnail:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAaVBMVEX6+/z//v/w9/TC5dCZ066p2br9/P+538cSpUsAmiwAnDPp9O/O6NgAnz0AoEAAmSah1rQ0rF3////F5NAAnjp5xJJ/yJhswIjW7N8ApEcAmzBHsWpcuXolqlXa7uLh8umGyp4+r2Ow3MBD0ZbyAAAA1UlEQVR4Ac2QRQLEIAxFgaJJvSl1vf8hh47rfv4GeUjy2J+Hh/xCIpJSCf2VGesAnMUvVMeQpCFZxL98lruDQSFKzh+XNcfYVIiWUqIaK9/4lt8Y1l3fu8TEth/iduyBwLX6AnE6f0YFm9WyEqUhfX65ypVLj8BYMjZc5vequMkoSajfMB78vIVXEnLrvSI1TNO4L54IauFt0o1P3XCGojQWjr/WEhdkd3bh8mIgCX70myGNF5bSJj7VLdmFgeFfxK4ZBOlbFdg37VLKln1hF8EX3f+cE/m4DUQHSACuAAAAAElFTkSuQmCC"
  //   },{
  //     id:1,
  //     title:"test",
  //     thumbnail:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAaVBMVEX6+/z//v/w9/TC5dCZ066p2br9/P+538cSpUsAmiwAnDPp9O/O6NgAnz0AoEAAmSah1rQ0rF3////F5NAAnjp5xJJ/yJhswIjW7N8ApEcAmzBHsWpcuXolqlXa7uLh8umGyp4+r2Ow3MBD0ZbyAAAA1UlEQVR4Ac2QRQLEIAxFgaJJvSl1vf8hh47rfv4GeUjy2J+Hh/xCIpJSCf2VGesAnMUvVMeQpCFZxL98lruDQSFKzh+XNcfYVIiWUqIaK9/4lt8Y1l3fu8TEth/iduyBwLX6AnE6f0YFm9WyEqUhfX65ypVLj8BYMjZc5vequMkoSajfMB78vIVXEnLrvSI1TNO4L54IauFt0o1P3XCGojQWjr/WEhdkd3bh8mIgCX70myGNF5bSJj7VLdmFgeFfxK4ZBOlbFdg37VLKln1hF8EX3f+cE/m4DUQHSACuAAAAAElFTkSuQmCC"
  //   },{
  //     id:1,
  //     title:"test",
  //     thumbnail:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAaVBMVEX6+/z//v/w9/TC5dCZ066p2br9/P+538cSpUsAmiwAnDPp9O/O6NgAnz0AoEAAmSah1rQ0rF3////F5NAAnjp5xJJ/yJhswIjW7N8ApEcAmzBHsWpcuXolqlXa7uLh8umGyp4+r2Ow3MBD0ZbyAAAA1UlEQVR4Ac2QRQLEIAxFgaJJvSl1vf8hh47rfv4GeUjy2J+Hh/xCIpJSCf2VGesAnMUvVMeQpCFZxL98lruDQSFKzh+XNcfYVIiWUqIaK9/4lt8Y1l3fu8TEth/iduyBwLX6AnE6f0YFm9WyEqUhfX65ypVLj8BYMjZc5vequMkoSajfMB78vIVXEnLrvSI1TNO4L54IauFt0o1P3XCGojQWjr/WEhdkd3bh8mIgCX70myGNF5bSJj7VLdmFgeFfxK4ZBOlbFdg37VLKln1hF8EX3f+cE/m4DUQHSACuAAAAAElFTkSuQmCC"
  //   },{
  //     id:1,
  //     title:"test",
  //     thumbnail:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAaVBMVEX6+/z//v/w9/TC5dCZ066p2br9/P+538cSpUsAmiwAnDPp9O/O6NgAnz0AoEAAmSah1rQ0rF3////F5NAAnjp5xJJ/yJhswIjW7N8ApEcAmzBHsWpcuXolqlXa7uLh8umGyp4+r2Ow3MBD0ZbyAAAA1UlEQVR4Ac2QRQLEIAxFgaJJvSl1vf8hh47rfv4GeUjy2J+Hh/xCIpJSCf2VGesAnMUvVMeQpCFZxL98lruDQSFKzh+XNcfYVIiWUqIaK9/4lt8Y1l3fu8TEth/iduyBwLX6AnE6f0YFm9WyEqUhfX65ypVLj8BYMjZc5vequMkoSajfMB78vIVXEnLrvSI1TNO4L54IauFt0o1P3XCGojQWjr/WEhdkd3bh8mIgCX70myGNF5bSJj7VLdmFgeFfxK4ZBOlbFdg37VLKln1hF8EX3f+cE/m4DUQHSACuAAAAAElFTkSuQmCC"
  //   },{
  //     id:1,
  //     title:"test",
  //     thumbnail:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAaVBMVEX6+/z//v/w9/TC5dCZ066p2br9/P+538cSpUsAmiwAnDPp9O/O6NgAnz0AoEAAmSah1rQ0rF3////F5NAAnjp5xJJ/yJhswIjW7N8ApEcAmzBHsWpcuXolqlXa7uLh8umGyp4+r2Ow3MBD0ZbyAAAA1UlEQVR4Ac2QRQLEIAxFgaJJvSl1vf8hh47rfv4GeUjy2J+Hh/xCIpJSCf2VGesAnMUvVMeQpCFZxL98lruDQSFKzh+XNcfYVIiWUqIaK9/4lt8Y1l3fu8TEth/iduyBwLX6AnE6f0YFm9WyEqUhfX65ypVLj8BYMjZc5vequMkoSajfMB78vIVXEnLrvSI1TNO4L54IauFt0o1P3XCGojQWjr/WEhdkd3bh8mIgCX70myGNF5bSJj7VLdmFgeFfxK4ZBOlbFdg37VLKln1hF8EX3f+cE/m4DUQHSACuAAAAAElFTkSuQmCC"
  //   },{
  //     id:1,
  //     title:"test",
  //     thumbnail:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAaVBMVEX6+/z//v/w9/TC5dCZ066p2br9/P+538cSpUsAmiwAnDPp9O/O6NgAnz0AoEAAmSah1rQ0rF3////F5NAAnjp5xJJ/yJhswIjW7N8ApEcAmzBHsWpcuXolqlXa7uLh8umGyp4+r2Ow3MBD0ZbyAAAA1UlEQVR4Ac2QRQLEIAxFgaJJvSl1vf8hh47rfv4GeUjy2J+Hh/xCIpJSCf2VGesAnMUvVMeQpCFZxL98lruDQSFKzh+XNcfYVIiWUqIaK9/4lt8Y1l3fu8TEth/iduyBwLX6AnE6f0YFm9WyEqUhfX65ypVLj8BYMjZc5vequMkoSajfMB78vIVXEnLrvSI1TNO4L54IauFt0o1P3XCGojQWjr/WEhdkd3bh8mIgCX70myGNF5bSJj7VLdmFgeFfxK4ZBOlbFdg37VLKln1hF8EX3f+cE/m4DUQHSACuAAAAAElFTkSuQmCC"
  //   },{
  //     id:1,
  //     title:"test",
  //     thumbnail:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAaVBMVEX6+/z//v/w9/TC5dCZ066p2br9/P+538cSpUsAmiwAnDPp9O/O6NgAnz0AoEAAmSah1rQ0rF3////F5NAAnjp5xJJ/yJhswIjW7N8ApEcAmzBHsWpcuXolqlXa7uLh8umGyp4+r2Ow3MBD0ZbyAAAA1UlEQVR4Ac2QRQLEIAxFgaJJvSl1vf8hh47rfv4GeUjy2J+Hh/xCIpJSCf2VGesAnMUvVMeQpCFZxL98lruDQSFKzh+XNcfYVIiWUqIaK9/4lt8Y1l3fu8TEth/iduyBwLX6AnE6f0YFm9WyEqUhfX65ypVLj8BYMjZc5vequMkoSajfMB78vIVXEnLrvSI1TNO4L54IauFt0o1P3XCGojQWjr/WEhdkd3bh8mIgCX70myGNF5bSJj7VLdmFgeFfxK4ZBOlbFdg37VLKln1hF8EX3f+cE/m4DUQHSACuAAAAAElFTkSuQmCC"
  //   },{
  //     id:1,
  //     title:"test",
  //     thumbnail:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAaVBMVEX6+/z//v/w9/TC5dCZ066p2br9/P+538cSpUsAmiwAnDPp9O/O6NgAnz0AoEAAmSah1rQ0rF3////F5NAAnjp5xJJ/yJhswIjW7N8ApEcAmzBHsWpcuXolqlXa7uLh8umGyp4+r2Ow3MBD0ZbyAAAA1UlEQVR4Ac2QRQLEIAxFgaJJvSl1vf8hh47rfv4GeUjy2J+Hh/xCIpJSCf2VGesAnMUvVMeQpCFZxL98lruDQSFKzh+XNcfYVIiWUqIaK9/4lt8Y1l3fu8TEth/iduyBwLX6AnE6f0YFm9WyEqUhfX65ypVLj8BYMjZc5vequMkoSajfMB78vIVXEnLrvSI1TNO4L54IauFt0o1P3XCGojQWjr/WEhdkd3bh8mIgCX70myGNF5bSJj7VLdmFgeFfxK4ZBOlbFdg37VLKln1hF8EX3f+cE/m4DUQHSACuAAAAAElFTkSuQmCC"
  //   },{
  //     id:1,
  //     title:"test",
  //     thumbnail:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAaVBMVEX6+/z//v/w9/TC5dCZ066p2br9/P+538cSpUsAmiwAnDPp9O/O6NgAnz0AoEAAmSah1rQ0rF3////F5NAAnjp5xJJ/yJhswIjW7N8ApEcAmzBHsWpcuXolqlXa7uLh8umGyp4+r2Ow3MBD0ZbyAAAA1UlEQVR4Ac2QRQLEIAxFgaJJvSl1vf8hh47rfv4GeUjy2J+Hh/xCIpJSCf2VGesAnMUvVMeQpCFZxL98lruDQSFKzh+XNcfYVIiWUqIaK9/4lt8Y1l3fu8TEth/iduyBwLX6AnE6f0YFm9WyEqUhfX65ypVLj8BYMjZc5vequMkoSajfMB78vIVXEnLrvSI1TNO4L54IauFt0o1P3XCGojQWjr/WEhdkd3bh8mIgCX70myGNF5bSJj7VLdmFgeFfxK4ZBOlbFdg37VLKln1hF8EX3f+cE/m4DUQHSACuAAAAAElFTkSuQmCC"
  //   },{
  //     id:1,
  //     title:"test",
  //     thumbnail:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAaVBMVEX6+/z//v/w9/TC5dCZ066p2br9/P+538cSpUsAmiwAnDPp9O/O6NgAnz0AoEAAmSah1rQ0rF3////F5NAAnjp5xJJ/yJhswIjW7N8ApEcAmzBHsWpcuXolqlXa7uLh8umGyp4+r2Ow3MBD0ZbyAAAA1UlEQVR4Ac2QRQLEIAxFgaJJvSl1vf8hh47rfv4GeUjy2J+Hh/xCIpJSCf2VGesAnMUvVMeQpCFZxL98lruDQSFKzh+XNcfYVIiWUqIaK9/4lt8Y1l3fu8TEth/iduyBwLX6AnE6f0YFm9WyEqUhfX65ypVLj8BYMjZc5vequMkoSajfMB78vIVXEnLrvSI1TNO4L54IauFt0o1P3XCGojQWjr/WEhdkd3bh8mIgCX70myGNF5bSJj7VLdmFgeFfxK4ZBOlbFdg37VLKln1hF8EX3f+cE/m4DUQHSACuAAAAAElFTkSuQmCC"
  //   },{
  //     id:1,
  //     title:"test",
  //     thumbnail:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAaVBMVEX6+/z//v/w9/TC5dCZ066p2br9/P+538cSpUsAmiwAnDPp9O/O6NgAnz0AoEAAmSah1rQ0rF3////F5NAAnjp5xJJ/yJhswIjW7N8ApEcAmzBHsWpcuXolqlXa7uLh8umGyp4+r2Ow3MBD0ZbyAAAA1UlEQVR4Ac2QRQLEIAxFgaJJvSl1vf8hh47rfv4GeUjy2J+Hh/xCIpJSCf2VGesAnMUvVMeQpCFZxL98lruDQSFKzh+XNcfYVIiWUqIaK9/4lt8Y1l3fu8TEth/iduyBwLX6AnE6f0YFm9WyEqUhfX65ypVLj8BYMjZc5vequMkoSajfMB78vIVXEnLrvSI1TNO4L54IauFt0o1P3XCGojQWjr/WEhdkd3bh8mIgCX70myGNF5bSJj7VLdmFgeFfxK4ZBOlbFdg37VLKln1hF8EX3f+cE/m4DUQHSACuAAAAAElFTkSuQmCC"
  //   },
  // ]

  const paintExtensionToolCards = () => {
    return extensionTools?.map(((info,i) => {
      return <CustomToolCard key={i} id={info.id} title={info.title} thumbnail={info.thumbnail} />
    }))
  }

  const [extensionHeight,setExtensionHeight]=useState(0);
  const extensionRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(!extensionRef.current)return;
    setExtensionHeight(window.innerHeight-extensionRef.current.offsetTop)
  },[])

  return (
    <div ref={extensionRef} className="extension" style={{height:extensionHeight-30}}>
      <div>作成した拡張機能</div>
       {paintExtensionToolCards()}
       <span className='newExtensionTool'>NEW&nbsp;TOOL</span>
    </div>
  )
}

export default CustomTool