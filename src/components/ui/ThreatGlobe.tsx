import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { securityNewsData, getSeverityColor, getSeverityBgColor, type ThreatLocation } from '../../data/securityNews';

interface ThreatGlobeProps {
  className?: string;
  onHover?: (location: ThreatLocation | null) => void;
}

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
}

export default function ThreatGlobe({ className = '', onHover }: ThreatGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const markersRef = useRef<THREE.Mesh[]>([]);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const isMountedRef = useRef<boolean>(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState<ThreatLocation | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Call onHover callback when hoveredLocation changes
  useEffect(() => {
    if (onHover) {
      onHover(hoveredLocation);
    }
  }, [hoveredLocation, onHover]);

  // Track mouse position for raycasting
  const updateMousePosition = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1;
    
    mouseRef.current.set(x, y);
    setTooltipPosition({ x: clientX, y: clientY });
  }, []);

  useEffect(() => {
    if (isMountedRef.current) return;
    isMountedRef.current = true;

    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create OrbitControls for drag and scroll rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.minDistance = 2;
    controls.maxDistance = 5;
    controls.enableZoom = true;
    controls.autoRotate = false;
    controlsRef.current = controls;

    // Create a group to hold all globe elements
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // Globe sphere
    const globeGeometry = new THREE.SphereGeometry(1, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x1E3A5F,
      emissive: 0x0A1628,
      specular: 0x3B82F6,
      shininess: 30,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globeGroup.add(globe);

    // Equator ring
    const equatorGeometry = new THREE.TorusGeometry(1.005, 0.003, 8, 64);
    const equatorMaterial = new THREE.MeshBasicMaterial({
      color: 0x06B6D4,
      transparent: true,
      opacity: 0.4,
    });
    const equator = new THREE.Mesh(equatorGeometry, equatorMaterial);
    equator.rotation.x = Math.PI / 2;
    globeGroup.add(equator);

    // Prime meridian ring
    const meridianGeometry = new THREE.TorusGeometry(1.005, 0.003, 8, 64);
    const meridianMaterial = new THREE.MeshBasicMaterial({
      color: 0x06B6D4,
      transparent: true,
      opacity: 0.4,
    });
    const meridian = new THREE.Mesh(meridianGeometry, meridianMaterial);
    globeGroup.add(meridian);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x3B82F6, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xEF4444, 0.5);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Markers for threat locations
    const markerGeometry = new THREE.SphereGeometry(0.03, 16, 16);
    const markerMaterialRed = new THREE.MeshBasicMaterial({ 
      color: 0xEF4444,
      transparent: true,
      opacity: 0.9,
    });

    securityNewsData.forEach((location) => {
      const pos = latLngToVector3(location.lat, location.lng, 1.02);
      const marker = new THREE.Mesh(markerGeometry.clone(), markerMaterialRed.clone());
      marker.position.copy(pos);
      marker.userData = { label: location.label, locationData: location };
      globeGroup.add(marker);
      markersRef.current.push(marker);
    });

    setIsLoaded(true);

    // Handle mouse move for hover detection
    const onMouseMove = (event: MouseEvent) => {
      if (!containerRef.current || !cameraRef.current) return;
      
      // const rect = containerRef.current.getBoundingClientRect();
      updateMousePosition(event.clientX, event.clientY);
      
      // Update raycaster
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      
      // Check marker intersections
      const intersects = raycasterRef.current.intersectObjects(markersRef.current, false);
      
      // Reset all markers
      markersRef.current.forEach(marker => {
        marker.scale.set(1, 1, 1);
        if (marker.material instanceof THREE.MeshBasicMaterial) {
          marker.material.color.setHex(0xEF4444);
        }
      });
      
      // Find intersected marker
      let foundMarker: THREE.Mesh | null = null;
      for (const intersect of intersects) {
        const obj = intersect.object as THREE.Mesh;
        if (obj.userData && obj.userData.locationData) {
          foundMarker = obj;
          break;
        }
      }
      
      if (foundMarker) {
        foundMarker.scale.set(1.5, 1.5, 1.5);
        if (foundMarker.material instanceof THREE.MeshBasicMaterial) {
          foundMarker.material.color.setHex(0xFF6B6B);
        }
        
        const locationData = foundMarker.userData.locationData as ThreatLocation;
        setHoveredLocation(locationData);
        renderer.domElement.style.cursor = 'pointer';
      } else {
        setHoveredLocation(null);
        renderer.domElement.style.cursor = 'grab';
      }
    };

    // Add event listener to the canvas element
    renderer.domElement.addEventListener('mousemove', onMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      globeGeometry.dispose();
      globeMaterial.dispose();
    };
  }, [updateMousePosition]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`relative ${className}`}
    >
      <div 
        ref={containerRef} 
        className="w-full aspect-square max-w-[400px] mx-auto"
        style={{ cursor: 'grab' }}
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xdr-muted">Loading threat visualization...</div>
        </div>
      )}
      
      {/* Tooltip - shows on hover with cybersecuritynews.com sources */}
      {hoveredLocation && (
        <div 
          className="fixed z-50 pointer-events-none"
          style={{
            left: tooltipPosition.x + 15,
            top: tooltipPosition.y - 10,
          }}
        >
          <div className="glassXDR rounded-lg shadow-xl border border-xdr-border/30 p-3 min-w-[280px] max-w-[320px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-xdr-critical animate-pulse"></div>
                <span className="font-semibold text-white text-sm">
                  {hoveredLocation.city}, {hoveredLocation.country}
                </span>
              </div>
              <span className="text-xs text-cyber-text-muted">Source: cybersecuritynews.com</span>
            </div>
            
            {/* News Items */}
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {hoveredLocation.news.map((news) => (
                <a
                  key={news.id}
                  href={news.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 rounded bg-black/20 hover:bg-black/40 transition-colors pointer-events-auto"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span 
                      className="text-xs font-medium px-1.5 py-0.5 rounded"
                      style={{ 
                        color: getSeverityColor(news.severity),
                        backgroundColor: getSeverityBgColor(news.severity)
                      }}
                    >
                      {news.severity.toUpperCase()}
                    </span>
                    <span className="text-xs text-cyber-text-muted">
                      {news.timestamp}
                    </span>
                  </div>
                  <h4 className="text-white text-xs font-medium mb-1 line-clamp-2">
                    {news.title}
                  </h4>
                  <p className="text-cyber-text-muted text-xs line-clamp-2">
                    {news.description}
                  </p>
                </a>
              ))}
            </div>
            
            {/* Footer */}
            <div className="mt-2 pt-2 border-t border-xdr-border/20 flex items-center justify-between text-xs text-cyber-text-muted">
              <span>{hoveredLocation.news.length} threat{hoveredLocation.news.length > 1 ? 's' : ''}</span>
              <span className="flex items-center space-x-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>cybersecuritynews.com</span>
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 glassXDR px-3 py-2 rounded-lg text-xs">
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-xdr-critical animate-pulse"></div>
          <span className="text-xdr-muted">Threat Source</span>
        </div>
        <div className="text-xdr-muted">Drag or scroll to rotate</div>
      </div>
    </motion.div>
  );
}
