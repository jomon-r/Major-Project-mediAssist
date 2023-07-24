import { useParams } from 'react-router';
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import './doctor.css'
import * as d3 from 'd3';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Doctorvisualization = () => {

    const svgRef = useRef(null);
    const navigate = useNavigate();
  
    const id = useParams();
    console.log(id)
    const [label, setLabel] = useState([])
    
  
    useEffect(() => {
      const svg = d3.select(svgRef.current);
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/node/${id.id}`);
          const data = await response.json();
          setLabel(data[0]);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
      fetchUserDetails();
    }, [id]);
  
    const textName = Object.keys(label).map(key => label[key]);
    console.log(textName);
  
    useEffect(() => {
      if(textName.length > 0){
        const svg = d3.select(svgRef.current);
        
        const data = [
          { x: 1400, y: 200 },
          { x: 1200, y: 200 },
          { x: 950, y: 150 },
          { x: 800, y: 350 },
          { x: 650, y: 300 },
          { x: 550, y: 50 },
          { x: 400, y: 400 },
          { x: 300, y: 200 },
        ];
  
        const width = 1500;
  
        const connections = svg.selectAll('line')
        .data(data.slice(1)) // Exclude the first node
        .enter()
        .append('line')
        .attr('x1', (d, i) => width - data[i].x)
        .attr('y1', (d, i) => data[i].y)
        .attr('x2', (d) => width - d.x)
        .attr('y2', (d) => d.y)
        .style('stroke', 'black')
        .style('stroke-width', 5);
  
        const nodes = svg.selectAll('g')
          .data(data)
          .enter()
          .append('g')
          .attr('transform', (d) => `translate(${width - d.x}, ${d.y})`);
  
        nodes.append('circle')
          .attr('r', 50)
          .style('fill', (_, index) => {
            if (index === 2 && label[index] > 125) {
              return 'red';
            } else if (index === 2 && textName[index] < 100) {
              return 'grey';
            } else if (index === 3 && textName[index] > 1.2) {
              return 'red';
            } else if (index === 3 && textName[index] < 0.6) {
              return 'grey';
            } else if (index === 4 && textName[index] > 6) {
              return 'red';
            } else if (index === 5 && textName[index] > 145) {
              return 'red';
            } else if (index === 5 && textName[index] < 136) {
              return 'grey';
            } else if (index === 6 && textName[index] > 70) {
              return 'red';
            } else if (index === 6 && textName[index] < 35) {
              return 'grey';
            } else if (index === 7 && textName[index] > 150) {
              return 'red';
            } else {
              return 'green'; // Set default color to 'steelblue'
            }
          });
  
        nodes.append('text')
          .text((_, index) => textName[index])
          .attr('x', 0)  // Adjust x-coordinate to center align the text
          .attr('y', 4)
          .style('font-size', '20px')
          .style('fill', 'black')
          .style('text-anchor', 'middle')  // Set text-anchor to middle for horizontal center alignment
          .style('dominant-baseline', 'middle')
          .style('font-weight', 'bold');
        }
        
      
      }, [label, textName]);

      const handleDoctor = () => {
        navigate(`/doctorpage/${id.id}`);
      };
  
    return (
      <>
      
      <div className='doctor1'>
      <div className="dheading">
            <h1 onClick={handleDoctor}>medi<span id="pspan">Assist</span></h1>
        </div>
        <h1 className='visual'>visualization</h1>
      
      <div className='doctorvisual'>
          <svg ref={svgRef} width="1400" height="500">
  
          </svg>
          <label className='zname'>Name</label>
          <label className='zage'>Age</label>
          <label className='zsugar'>Blood Sugar</label>
          <label className='zcreatinine'>Creatinine</label>
          <label className='zhba1c'>HBA1C</label>
          <label className='zsodium'>Sodium</label>
          <label className='zhdl'>HDL</label>
          <label className='zldl'>LDL</label>
      </div>
      </div>
      </>
    )
  }
  
  export default Doctorvisualization;