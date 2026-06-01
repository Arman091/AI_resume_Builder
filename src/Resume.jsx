
/**
 * Resume Component.
 * Renders the visual layout of the resume based on the provided data object.
 * 
 * @param {Object} props - Component props.
 * @param {Object} props.data - The resume data object containing personalInfo, workExperiences, etc.
 */
import { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import html2pdf from 'html2pdf.js';
import { ResumePdfDocument } from './pdf/ResumePdf.jsx';

export function Resume({ data }) {
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);

  if (!data) return <p>No resume data provided.</p>;
  const { personalInfo, summary, workExperiences, technicalSkills, education, additionalInfo } = data;

  const handlePrint = () => {
    const element = document.querySelector(".container");
    
    element.classList.add("resume-pdf");

    html2pdf()
    .from(element)
    .set({
      margin: [0, 0, 10, 10],
      textAlign:"center",
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    })
    .save();

    element.classList.remove("resume-pdf");
  };

  return (
    <div className="container">
      {/* <button type="button" className="print-button" onClick={handlePrint}>
        Print Resume
      </button> */}
      <button
        type="button"
        className="pdf-preview-button"
        onClick={() => setPdfPreviewOpen(true)}
      >
        Preview PDF
      </button>
      {pdfPreviewOpen && (
        <div className="pdf-preview-modal" onClick={() => setPdfPreviewOpen(false)}>
          <div className="pdf-preview-modal__box" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setPdfPreviewOpen(false)}>
              Close
            </button>
            <PDFViewer style={{ width: '100%', height: '90vh' }}>
              <ResumePdfDocument data={data} />
            </PDFViewer>
          </div>
        </div>
      )}
      {/* NAME */}
      <div className="author">
        <h1>{personalInfo.name}</h1>
        {/* job Title */}
        <p>{personalInfo.jobTitle}</p>
      </div>

      {/* CONTACT */}
      <div className="contact">
        <div className="contact-line">
          {personalInfo.location}
          <span className="separator">•</span>
          <a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
          <span className="separator">•</span>
          <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
        </div>

        <div className="contact-links">
          {personalInfo.links.map((link, index) => (
            <a 
              key={index}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* SUMMARY */}
      <div className="section-title">Summary</div>
      <p>{summary}</p>

      {/* WORK EXPERIENCE */}
      <hr className="hr" />
      <div className="section-title">Work Experiences</div>
      {workExperiences.map((experience, index) => (
        <div key={index}>
          <div className="jobsection">
            <div className="job-title">{experience.title}</div>
            <div className="job-meta">{experience.period}</div>
          </div>
          <ul>
            {experience.responsibilities.map((responsibility, respIndex) => (
              <li key={respIndex}>{responsibility}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* TECHNICAL SKILLS */}
      <hr className="hr" />
      <div className="section-title">Technical Skills</div>
      <div className="skills">
        {technicalSkills.map((skill, index) => (
          <div key={index} className="skill-row">
            <span className="skill-title">{skill.category}</span>
            <span className="skill-items">{skill.items}</span>
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <hr className="hr" />
      <div className="education-block">
        <p className="education-title">Education</p>
        <div className="edu-header">
          <span className="degree">{education.degree}</span>
          <span className="edu-date">{education.period}</span>
        </div>
        <div className="university">
          {education.university}
        </div>
      </div>

      {/* ADDITIONAL */}
      <hr className="hr" />
      <div className="section-title">Additional Information</div>

      <div className="additional-block">
        {additionalInfo.map((info, index) => (
          <div key={index} className="additional-row">
            <span className="additional-label">{info.label}</span>
            <span className="additional-value">{info.value}
              <span className="separator">
               {info.link && <a href={info.link} target="_blank" rel="noopener noreferrer">View
                </a>
               }
              </span>
            </span>
         
          </div>
        ))}
      </div>
    </div>
  );
}
