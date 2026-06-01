import { Document, Page, Text, View, Link } from '@react-pdf/renderer';
import { pdfStyles as styles } from './resumePdfStyles.js';

export function ResumePdfDocument({ data }) {
  if (!data) return null;

  const {
    personalInfo,
    summary,
    workExperiences,
    technicalSkills,
    education,
    additionalInfo,
  } = data;

  return (
    <Document title={`${personalInfo.name} - Resume`}>
      <Page size={[595.28, 1000]} style={styles.page}>
        <View style={styles.author}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          <Text style={styles.roleTitle}>{personalInfo.jobTitle}</Text>
        </View>

        <View style={styles.contact}>
          <View style={styles.contactLine}>
            <Text>{personalInfo.location}</Text>
            <Text style={styles.separator}> • </Text>
            <Link style={styles.link} src={`tel:${personalInfo.phone}`}>
              {personalInfo.phone}
            </Link>
            <Text style={styles.separator}> • </Text>
            <Link style={styles.link} src={`mailto:${personalInfo.email}`}>
              {personalInfo.email}
            </Link>
          </View>
          <View style={styles.contactLinks}>
            {personalInfo.links?.map((link, i) => (
              <Link key={i} style={styles.link} src={link.url}>
                {link.label}
              </Link>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.summary}>{summary}</Text>

        <View style={styles.hr} />
        <Text style={styles.sectionTitle}>Work Experiences</Text>
        {workExperiences?.map((exp, i) => (
          <View key={i}>
            <View style={styles.jobHeader}>
              <Text style={styles.experienceTitle}>{exp.title}</Text>
              <Text style={styles.jobMeta}>{exp.period}</Text>
            </View>
            {exp.responsibilities?.map((r, j) => (
              <View key={j} style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{r}</Text>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.hr} />
        <Text style={styles.sectionTitle}>Technical Skills</Text>
        {technicalSkills?.map((skill, i) => (
          <View key={i} style={styles.skillRow}>
            <Text style={styles.skillLabel}>{skill.category}</Text>
            <Text style={styles.skillItems}>{skill.items}</Text>
          </View>
        ))}

        <View style={styles.hr} />
        <Text style={styles.sectionTitle}>Education</Text>
        <View style={styles.eduHeader}>
          <Text style={styles.degree}>{education.degree}</Text>
          <Text style={styles.eduDate}>{education.period}</Text>
        </View>
        <Text style={styles.university}>{education.university}</Text>

        <View style={styles.hr} />
        <Text style={styles.sectionTitle}>Additional Information</Text>
        {additionalInfo?.map((info, i) => (
          <View key={i} style={styles.additionalRow}>
            <Text style={styles.additionalLabel}>{info.label}</Text>
            <Text style={styles.additionalValue}>
              {info.value}
              {info.link && (
                <>
                  {' '}
                  <Link style={styles.link} src={info.link}>
                    View
                  </Link>
                </>
              )}
            </Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
