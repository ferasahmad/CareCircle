import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Markdown from "react-native-markdown-display";

interface ChatbotAssessmentProps {
  assessment: string;
}

const ChatbotAssessment: React.FC<ChatbotAssessmentProps> = ({
  assessment,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.iconAndTitle}>
        <Image
          source={require("../assets/images/bot.png")}
          style={styles.icon}
        />
        <Text style={styles.title}>Chatbot Assessment</Text>
      </View>
      <Markdown
        style={{
          heading3: {
            fontWeight: 500,
            marginVertical: 10,
            color: "black",
          },
          body: {
            fontSize: 14,
            color: "#555",
            lineHeight: 22,
          },
        }}
      >
        {isExpanded
          ? assessment
          : assessment.split("\n").slice(0, 5).join("\n")}
      </Markdown>
      {!isExpanded && (
        <LinearGradient
          colors={[
            "rgba(254,250,224,0)",
            "rgba(254,250,225,0.8)",
            "rgba(254,250,224,1)",
          ]}
          style={styles.gradient}
        >
          <TouchableOpacity onPress={() => setIsExpanded(true)}>
            <Text style={styles.expandText}>Show More</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#FEFAE1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: "flex-end",
    paddingBottom: 15,
  },
  icon: {
    height: 24,
    width: 24,
  },
  iconAndTitle: {
    flexDirection: "row",
    gap: 5,
  },
  expandText: {
    fontSize: 16,
    color: "black",
    fontWeight: "500",
    textAlign: "center",
  },
});

export default ChatbotAssessment;
