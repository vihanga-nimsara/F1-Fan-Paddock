"use client";

import Link from "next/link";
import {
  Box,
  Typography,
  Avatar,
  CardActionArea,
} from "@mui/material";
import SportsMotorsportsRounded from "@mui/icons-material/SportsMotorsportsRounded";

type Props = {
  href: string;
  image?: string;
  title: string;
  meta?: string[];
  duration?: string;
  tag?: string;
  channel?: string;
};

export default function F1Card({
  href,
  image,
  title,
  meta = [],
  duration,
  tag,
  channel,
}: Props) {
  return (
    <CardActionArea
      component={Link}
      href={href}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        p: 0,
        overflow: "hidden",
        borderRadius: "3px",
        td: { color: "text.primary" },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
          bgcolor: "rgba(255,255,255,0.06)",
          borderRadius: "3px",
        }}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            <SportsMotorsportsRounded fontSize="inherit" sx={{ fontSize: 44 }} />
          </Box>
        )}
        {duration && (
          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              bgcolor: "rgba(0,0,0,0.8)",
              color: "#fff",
              fontSize: 12,
              fontWeight: 600,
              px: 0.75,
              py: 0.25,
              borderRadius: "3px",
            }}
          >
            {duration}
          </Box>
        )}
        {tag && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              bgcolor: "#e10600",
              color: "#fff",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              px: 1,
              py: 0.5,
              borderRadius: "3px",
            }}
          >
            {tag}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          width: "100%",
          p: 1.5,
        }}
      >
        {channel && (
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: "#e10600",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              mt: 0.5,
            }}
          >
            {channel.trim().charAt(0).toUpperCase()}
          </Avatar>
        )}
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              fontSize: 14,
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>
          {meta.length > 0 && (
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontSize: 12, mt: 0.5, display: "block" }}
            >
              {meta.join(" · ")}
            </Typography>
          )}
        </Box>
      </Box>
    </CardActionArea>
  );
}