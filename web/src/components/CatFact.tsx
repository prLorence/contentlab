import type { ReactElement } from 'react'

interface CatFactProperties {
    fact: string;
}

function CatFact({ fact }: CatFactProperties): ReactElement {
    return (
        <div className="p-4 rounded-lg mt-4">
            <h3 className="text-lg font-bold mb-2">Random Cat Fact</h3>
            <p>{fact}</p>
        </div>
    );
}

export default CatFact;
