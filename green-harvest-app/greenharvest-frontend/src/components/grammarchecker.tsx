import React, { useState } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    CircularProgress,
    Box,
  } from "@mui/material";
function GrammarChecker() {
    const [inputText, setInputText] = useState("");
    const [htmlResponse, setHtmlResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCheckGrammar = async () => {
      if (!inputText.trim()) return;

      setLoading(true);
      setHtmlResponse("");

      try {
        const res = await fetch("http://localhost:5001/api/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: inputText }),
        });

        const data = await res.json();
        setHtmlResponse(data.reply); // Make sure this is sanitized HTML from the API
      } catch (error) {
        console.error("API error:", error);
        setHtmlResponse("<p style='color:red;'>Something went wrong.</p>");
      }

      setLoading(false);
    };

    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          📝 Grammar Checker
        </Typography>

        <TextField
          label="Enter a sentence"
          multiline
          rows={6}
          fullWidth
          variant="outlined"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Box display="flex" justifyContent="center" mb={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCheckGrammar}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Check Grammar"}
          </Button>
        </Box>

        <Paper elevation={3} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
          <Typography variant="h6" gutterBottom>
            Result
          </Typography>

          <Typography
            component="div"
            sx={{ fontFamily: 'Roboto, sans-serif', lineHeight: 1.6, color: "#333" }}
            dangerouslySetInnerHTML={{ __html: htmlResponse }}
        />
        </Paper>
      </Container>
    );
}

export default GrammarChecker;
