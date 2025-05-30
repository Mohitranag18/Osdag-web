import React from "react";
import { Button } from "antd";
import "../App.css";

function StrutsInTrussesOutputDock({ output }) {
    const [isPatternModalOpen, setPatternModalOpen] = React.useState(false);
    const [patternData, setPatternData] = React.useState({
        title: "",
        function: null,
    });

    const handlePatternClick = (title, patternFunction) => {
        setPatternData({
            title,
            function: patternFunction,
        });
        setPatternModalOpen(true);
    };

    const sectionDetailsLabels = [
        "Designation",
        "Utilization Ratio",
        "Section Classification",
        "Eff. Sectional Area (mm)",
        "Eff. Length (m)",
        "Effective SR",
        "Lambda v-v",
        "Lambda psi",
        "Bucking Stress (MPa)",
        "Buckling Curve",
        "Imperfection",
        "Stress Reduction",
        "ND Eff, Senderness"
    ];

    const designResultsLabels = [
        "Compressive Stress (MPa)",
        "Design Strength (kN)"
    ];

    if (!output) {
        return (
            <div className="OutputDock">
                <p>Output Dock</p>
                <div className="output-content">
                    <div className="output-item">
                        <strong>No output to display. Submit the design to see results.</strong>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="OutputDock">
            <p>Output Dock</p>
            <div className="output-content scroll-data">
                {Object.keys(output).map((key, i) => {
                    if (key === "NULL") return null;

                    const sectionItems = output[key].filter(item =>
                        sectionDetailsLabels.includes(item.label)
                    );

                    const resultItems = output[key].filter(item =>
                        designResultsLabels.includes(item.label)
                    );

                    const patternItems = output[key].filter(
                        item => item.label === "Pattern" || item.label === "Spacing Details"
                    );

                    return (
                        <div key={i} className="component-grid">
                            <div className="component-grid-align">
                                <h3>{key}</h3>
                            </div>

                            {sectionItems.length > 0 && (
                                <div className="details-main-body">
                                    <h4>Section Details</h4>
                                    {sectionItems.map((item, index) => (
                                        <div key={index} className="output-item">
                                            <div className="output-label">
                                                <strong>{item.label}</strong>
                                            </div>
                                            <div className="output-value">{item.val}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {resultItems.length > 0 && (
                                <div className="details-main-body">
                                    <h4>Design Results</h4>
                                    {resultItems.map((item, index) => (
                                        <div key={index} className="output-item">
                                            <div className="output-label">
                                                <strong>{item.label}</strong>
                                            </div>
                                            <div className="output-value">{item.val}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {patternItems.length > 0 && (
                                <div className="details-main-body">
                                    {patternItems.map((item, index) => (
                                        <div key={index} className="output-item">
                                            <div className="output-label">
                                                <strong>{item.label}</strong>
                                            </div>
                                            <div className="output-value">
                                                <Button
                                                    className="pattern-btn"
                                                    onClick={() =>
                                                        handlePatternClick(item.label, item.val)
                                                    }
                                                >
                                                    {item.label}
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Pattern Modal */}
                {isPatternModalOpen && patternData.function && (
                    <div className="pattern-modal">
                        <div className="pattern-modal-content">
                            <div className="pattern-modal-header">
                                <h2>{patternData.title}</h2>
                                <span
                                    className="pattern-modal-close"
                                    onClick={() => setPatternModalOpen(false)}
                                >
                                    &times;
                                </span>
                            </div>
                            <div className="pattern-modal-body">
                                {patternData.function(true).map((content, index) => {
                                    const type = content[2];
                                    const data = content[3];

                                    if (type === "TYPE_IMAGE") {
                                        return (
                                            <div key={index} className="pattern-image-container">
                                                <img src={data[0]} alt={data[3]} width={data[1]} height={data[2]} />
                                                <p>{data[3]}</p>
                                            </div>
                                        );
                                    }

                                    if (type === "TYPE_TEXTBOX") {
                                        return (
                                            <div key={index} className="pattern-item">
                                                <div className="pattern-label">
                                                    <strong>{content[1]}</strong>
                                                </div>
                                                <div className="pattern-value">{data}</div>
                                            </div>
                                        );
                                    }

                                    if (type === "TYPE_NOTE") {
                                        return (
                                            <div key={index} className="pattern-note">
                                                <p>{content[1]}</p>
                                            </div>
                                        );
                                    }

                                    if (type === "TYPE_SECTION") {
                                        return (
                                            <div key={index} className="pattern-section">
                                                <h3>{content[1]}</h3>
                                                <div className="pattern-image-container">
                                                    <img src={data[0]} alt={data[3]} width={data[1]} height={data[2]} />
                                                    <p>{data[3]}</p>
                                                </div>
                                            </div>
                                        );
                                    }

                                    return null;
                                })}
                            </div>
                            <div className="pattern-modal-footer">
                                <Button onClick={() => setPatternModalOpen(false)}>Close</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StrutsInTrussesOutputDock;
