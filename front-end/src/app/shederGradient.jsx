"use client"
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react"

export default function Gradient() {
    return (
        <div style={{ position:"fixed", width:"100vw", height: "100vh", left:"0", top:"0", zIndex:"-1"}}>
            <ShaderGradientCanvas style={{position:"absolute", top:"0", right:"0"}}>
                <ShaderGradient
                    animate="on"
                    axesHelper="off"
                    bgColor1="#000000"
                    bgColor2="#000000"
                    brightness={1}
                    cAzimuthAngle={180}
                    cDistance={2.8}
                    cPolarAngle={80}
                    cameraZoom={9.1}
                    color1="#040080"
                    color2="#061aca"
                    color3="#000000"
                    destination="onCanvas"
                    embedMode="off"
                    envPreset="city"
                    format="gif"
                    fov={45}
                    frameRate={10}
                    gizmoHelper="hide"
                    grain="on"
                    lightType="3d"
                    pixelDensity={1}
                    positionX={0}
                    positionY={0}
                    positionZ={0}
                    range="disabled"
                    rangeEnd={40}
                    rangeStart={0}
                    reflection={0.1}
                    rotationX={50}
                    rotationY={0}
                    rotationZ={-60}
                    shader="defaults"
                    type="waterPlane"
                    uAmplitude={0}
                    uDensity={1.6}
                    uFrequency={0}
                    uSpeed={0.1}
                    uStrength={1.5}
                    uTime={8}
                    wireframe={false}
                />
            </ShaderGradientCanvas>
        </div>
    )
}