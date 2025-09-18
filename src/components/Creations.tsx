import React from 'react';
import Research from './Research';
import Products from './Products';

interface CreationsProps {
  researchItems: any;
  products: any;
  tagStyles: any;
}

const Creations: React.FC<CreationsProps> = ({ researchItems, products, tagStyles }) => {
  return (
    <section id="creations" className="py-20 bg-base border-t-2 border-primary/10">
      <div className="container mx-auto px-6">
        <h2 className="section-title">Creations</h2>
        <Products products={products} tagStyles={tagStyles} />
        <Research researchItems={researchItems} tagStyles={tagStyles} />
      </div>
    </section>
  );
};

export default Creations;